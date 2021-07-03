
public class Solution {
    public List<List<Integer>> subsets(int[] arr) {
        Arrays.sort(arr);
        int n=arr.length;
        List<List<Integer>>final_ans=new ArrayList<>();
        // final_ans.add();
        ArrayList<Integer>ans=new ArrayList<>();
        solve(arr,0,ans,final_ans);
        return final_ans;
    }

    public void solve(int[]arr,int idx,ArrayList<Integer>ans,List<List<Integer>>final_ans){
        int n=arr.length;
        
        ArrayList<Integer>temp=new ArrayList<>();
        temp.addAll(ans);
        final_ans.add(temp);

       if(idx==n)
       return;

       for(int i=idx;i<n;i++){
           ans.add(arr[i]);
           solve(arr,i+1,ans,final_ans);
           ans.remove(ans.size()-1);
       }

    }
}
